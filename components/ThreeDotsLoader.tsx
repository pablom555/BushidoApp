import ContentLoader from 'react-content-loader';

const ThreeDotsLoader = () => (
  <>
    <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
      <ContentLoader
        viewBox="0 0 400 160"
        backgroundColor="transparent"
        className="w-full h-full"
      >
        <circle cx="150" cy="86" r="6" />
        <circle cx="194" cy="86" r="6" />
        <circle cx="238" cy="86" r="6" />
      </ContentLoader>
    </div>

    <div className="opacity-40 fixed inset-0 z-40 bg-black" />
  </>
);

export default ThreeDotsLoader;
