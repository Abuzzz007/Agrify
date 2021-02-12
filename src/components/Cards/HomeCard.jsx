function HomeCard(props) {
    return (<div className="bg-white shadow-2xl rounded-lg mb-6 tracking-wide relative">
        
        <div className="md:flex-shrink-0">
            <img
                src={props.bg}
                alt="bg"
                className="w-full rounded-lg rounded-b-none"
                style={{height:200,width:300}}
            />
        </div>
        <div className="px-4 py-2 mt-2">
            <h2 className="font-bold text-2xl text-gray-800 text-center tracking-normal">
                {props.title}
            </h2>
        </div>
    </div>)
}

export default HomeCard