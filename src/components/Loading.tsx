const LoadingPage = () => {
    return (
        <div className='fixed top-0 left-0 w-full h-full z-10 bg-slate-400/70 select-none flex items-center justify-center space-x-2' aria-disabled>
            <span className="sr-only">Loading...</span>
            <div className="h-6 w-6 animate-bounce rounded-full bg-mainColor [animation-delay:-0.3s] md:h-8 md:w-8"></div>
            <div className="h-6 w-6 animate-bounce rounded-full bg-mainColor [animation-delay:-0.15s] md:h-8 md:w-8"></div>
            <div className="h-6 w-6 animate-bounce rounded-full bg-mainColor md:h-8 md:w-8"></div>
        </div>
    );
}
 
export default LoadingPage;