import { useState, type FormEvent } from 'react'
import Navbar from '~/components/Navbar'
import FileUploader from '~/components/FileUploader';
import { usePuterStore } from '~/lib/puter'
import { useNavigate } from 'react-router';
import { convertPdfToImage } from '~/lib/pdf2image'; 

const upload = () => {
    const { auth , isLoading , fs , ai , kv} = usePuterStore();
    const navigate = useNavigate();
    const [isProcessing, setIsProcessing] = useState(false);
    const [statusText, setStatusText] = useState('');
    const [file, setFile] = useState<File | null>();
    const handleFileSelect = (file: File | null) => {
        setFile(file)
    }

    const handleAnalyze = async ({
        companyName,
        jobTitle,
        jobDescription,
        file,
    }: {
        companyName: string;
        jobTitle: string;
        jobDescription: string;
        file: File;
    }) => {
        // Function body here
    }
    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const form = e.currentTarget.closest('form');
        if (!form) return;
        const fromData = new FormData(form);

        const companyName = fromData.get('company-name') as string;
        const jobTitle = fromData.get('job-title')as string;
        const jobDescription = fromData.get('job-description')as string;

        if(!file) return;
        handleAnalyze({companyName,jobTitle,jobDescription,file});
        setIsProcessing(true);
        setStatusText('uploading the file...');
        const uploadedFile : any = await fs.upload([file]);

        if(!uploadedFile) return setStatusText('Error: Failed to upload file');

        setStatusText('Converting to image...');
        const imageFile = await convertPdfToImage(file);

        if(!imageFile.file) return setStatusText ('Error:Failed to convert to Image');
        setStatusText('uploading the image...');

        const uploadedImage = await fs.upload([imageFile.file]);
        if(!uploadedImage) return setStatusText('Error: Failed to upload Image');

        setStatusText('Preparing data...');

        const uuid = generateUUID();
    }

    return (
        <main className="bg-[url('/images/bg-main.svg')] bg-cover flex flex-col items-center w-full min-h-screen">
            <Navbar />

            <section className='main-section'>
                <div className="page-heading py-16">
                    <h1>Smart feedback for your dream job</h1>
                    {isProcessing ? (
                        <>
                            <h2>{statusText}</h2>
                            <img src="/images/resume-scan.gif" className="w-full" />
                        </>
                    ) : (
                        <h2>Drop your resume for an ATS score and improvement tips</h2>
                    )}

                    {!isProcessing && (
                        <form id="upload-form" onSubmit={handleSubmit} className="flex flex-col gap-4 mt-8">
                            <div className="form-div">
                                <label htmlFor="company-name">Company Name</label>
                                <input type="text" name="company-name" placeholder="Company Name" id="company-name" className="p-3 rounded-xl border border-gray-300 w-full" />
                            </div>
                            <div className="form-div">
                                <label htmlFor="job-title">Job Title</label>
                                <input type="text" name="job-title" placeholder="Job Title" id="job-title" className="p-3 rounded-xl border border-gray-300 w-full" />
                            </div>
                            <div className="form-div">
                                <label htmlFor="job-description">Job Description</label>
                                <textarea rows={5} name="job-description" placeholder="Job Description" id="job-description" className="p-3 rounded-xl border border-gray-300 w-full" />
                            </div>
                            <div className="form-div">
                                <label htmlFor="uploader">Upload Resume</label>
                                <FileUploader onFileSelect={handleFileSelect} />
                            </div>

                            <button className="primary-button" type="submit">
                                Anayze Resume
                            </button>

                        </form>
                    )

                    }
                </div>
            </section>
        </main>
    )
}

export default upload