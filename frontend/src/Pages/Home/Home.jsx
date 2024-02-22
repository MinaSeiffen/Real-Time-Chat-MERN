import MessageContainer from "../../Components/Messages/MessagesContainer";
import Sidebar from "../../Components/SideBar/Sidebar";

const Home = () => {
	return (
		<div className='flex absolute top-32 justify-center sm:h-[450px] md:h-[650px] rounded-lg overflow-hidden bg-gray-400 bg-clip-padding backdrop-filter backdrop-blur-lg bg-opacity-0'>
			<Sidebar />
			<MessageContainer />
		</div>
	);
};
export default Home;
