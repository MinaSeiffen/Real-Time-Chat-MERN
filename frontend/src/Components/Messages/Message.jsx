import { useAuthContext } from "../../Context/AuthContext"
// import { extractTime } from "../../utils/extractTime";
import useConversation from "../../Zustand/useConversation.js";
import { extractTime } from "../../utils/extractTimr.js";

const Message = ({message}) => {
	const { authUser } = useAuthContext();
	const {selectedConversation} = useConversation();
	const fromMe = message.senderId === authUser._id
	const chatClass = fromMe? "chat-end" : "chat-start"
	const profilePic = fromMe? authUser.profilePic : selectedConversation.profilePic
	const bgColor = fromMe? "bg-blue-500" : ""
	const time = extractTime(message.createdAt)
	const shakeClass = message.shouldShake ? "shake" : ""

	return (
		<div className={`chat ${chatClass}`}>
			<div className='chat-image avatar'>
				<div className='w-10 rounded-full'>
					<img alt='Tailwind CSS chat bubble component' src={profilePic} />
				</div>
			</div>
			<div className={`chat-bubble text-white ${bgColor} ${shakeClass} pb-2`}> {message.message} </div>
			<div className='chat-footer opacity-50 text-xs flex gap-1 items-center'>{time}</div>
		</div>
	);
};
export default Message;