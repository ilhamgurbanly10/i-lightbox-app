
import { useMemo } from 'react';
import './App.css'
import ILightbox, { useILightboxData, type UseILightboxData, type ILightboxImages, type ILightboxOptions } from './components/Lightbox';

function App() {

  const { ILightboxStates }: UseILightboxData = useILightboxData();

  const images: ILightboxImages = [
    {
      src: "/images/img_01.jpg",
      alt: "What is Lorem Ipsum?",
      title: "What is Lorem Ipsum?"
    },
    {
      src: "/images/img_02.jpg",
      alt: "Why do we use it?",
      title: "Why do we use it?",
    },
    {
      src: "/images/img_03.webp",
      alt: "Where does it come from?",
      title: "Where does it come from?"
    },
    {
      src: "/images/img_04.jpg",
      alt: "Where can I get some?",
      title: "Where can I get some?"
    },
    {
      src: "/images/img_05.jpg",
      alt: "Lorem Ipsum is simply dummy text of the printing and typesetting industry.",
      title: "Lorem Ipsum is simply dummy text of the printing and typesetting industry."
    }, 
    {
      src: "/images/img_06.JPG",
      alt: "It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout.",
      title: "It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout."
    }, 
     {
      src: "/images/img_07.jpg",
      alt: "The standard chunk of Lorem Ipsum used since 1966 is reproduced below for those interested.",
      title: "The standard chunk of Lorem Ipsum used since 1966 is reproduced below for those interested."
    }, 
     {
      src: "/images/img_08.webp",
      alt: "Lorem Ipsum",
      title: "Lorem Ipsum"
    }, 
     {
      src: "/images/img_09.webp",
      alt: "The generated Lorem Ipsum is therefore always free from repetition, injected humour, or non-characteristic words etc.",
      title: "The generated Lorem Ipsum is therefore always free from repetition, injected humour, or non-characteristic words etc."
    }
  ];

  const options = useMemo<ILightboxOptions>(() => {
    return {
      playable: true,
      zoomable: true,
      playingDuration: 3000
    }
  }, [])

  return (
    <>

      <h1 className='title'> ILightbox React Package by Ilham Gurbanly</h1>

      <section className='gallery-section'>
        {images.map((item, i) => (
          <img className='gallery-section-img' key={i} src={item.src} onClick={() => {
            ILightboxStates.setActiveIndex(i);
            ILightboxStates.setShow(true);
          }} />
        ))}
      </section>

      <ILightbox
        states={ILightboxStates}
        images={images}
        options={options}
      />

      <div className='doc-container'>
        <h1 className='doc-title'>Documentation:</h1>
        <ul className='doc-list'>
          <li><strong>images: </strong> {`array of objects: {src: string, alt: string (optional), title: string (optional)}`}, src for image source, alt for image alt 
          attribute and title for lightbox title.</li>
          <li><strong>options: </strong>
          options object: {`{ playable: boolean (optional), zoomable: boolean (optional), playingDuration: number (optional)}`}, playable option is to show or to hide 
          play and pause buttons, initial value is true, zoomable option to show or to hide zoom in and zoom out buttons, initial value is true, 
          playingDuration is for playing time in milliseconds, initial value is 5000.</li>
          <li><strong>states: </strong> lightbox states to change them outside of lightbox component to be able better control over actions.
          activeIndex, setActiveIndex are to get and set active image index, show and setShow are to get and set lightbox is shown or not.</li>
        </ul>
      </div>

    </>
  )
}

export default App
