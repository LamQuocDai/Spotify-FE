import Header from './user/Header.jsx'
import Library from './user/Library.jsx';
import MainContent from './user/MainContent.jsx';
const HomePage = () => {
    return (
        <div className='flex flex-1 flex-col h-screen bg-black'>
            <Header/>
            <div className='flex flex-1 flex-row'>
                <Library/>
                <MainContent/>
            </div>
        </div>
    );
};

export default HomePage;
