import { useState } from "react";
import {
	BiDownvote,
	BiSolidUpvote,
	BiSolidDownvote,
	BiUpvote,
} from "react-icons/bi";

type FeedbackProps = {
	feedback: boolean | null;
	onFeedbackChange: (newFeedback: boolean | null) => void;
};

const FeedbackButton: React.FC<FeedbackProps> = ({
	feedback,
	onFeedbackChange,
}) => {
	return (
		<div className="flex flex-row border-border border justify-end w-12">
			{feedback === null || !feedback ? (
				<BiUpvote
					size={20}
					onClick={() => {
						onFeedbackChange(true);
					}}
				/>
			) : (
				<BiSolidUpvote
					size={20}
					onClick={() => {
						if (feedback) {
							onFeedbackChange(null);
						}
					}}
				/>
			)}
			<div className="">|</div>
			{feedback === null || feedback ? (
				<BiDownvote
					size={20}
					onClick={() => {
						onFeedbackChange(false);
					}}
				/>
			) : (
				<BiSolidDownvote
					size={20}
					onClick={() => {
						if (!feedback) {
							onFeedbackChange(null);
						}
					}}
				/>
			)}
		</div>
	);
};

export default FeedbackButton;
