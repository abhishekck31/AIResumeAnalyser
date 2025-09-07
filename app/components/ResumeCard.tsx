import { Link } from 'react-router';
import ScoreCircle from './ScoreCircle';

const ResumeCard = ({ resume: { id, companyName, jobTitle, feedback,imagePath } }: { resume: Resume }) => {
    return (
    <Link to={`/resume/${id}`} className="resume-card animate-in fade-in duration-1000 max-w-[320px] w-full p-5">
            <div className="resume-card-header">
                <div className="flex flex-col gap-2">
                    <h2 className='text-black font-bold break-words'>{companyName}</h2>
                    <h3 className="text-lg break-words text-gray-500">{jobTitle}</h3>
                </div>
                <div className="flex-shrink-0">
                    <ScoreCircle score={feedback.overallScore} />
                </div>
            </div>
            <div className="gradient-border animate-in fade-in duration-1000">
                <div className="w-full h-full">
                    <img src={imagePath}
                        alt="resume"
                        className="w-full h-[180px] sm:h-[180px] md:h-[220px] xl:h-[260px] object-cover object-top rounded-xl" />
                </div>
            </div>
        </Link>
    )
}

export default ResumeCard