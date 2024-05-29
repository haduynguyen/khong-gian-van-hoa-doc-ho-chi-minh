import styled from 'styled-components';
import 'quill/dist/quill.snow.css';

const Wrapper = styled.div`
  display: flex;
  gap: 50px;

  article {
    width: calc(100% - 350px);
    min-height: 100vh;

    .ql-editor {
      padding: 0;
    }

    h1 {
      font-size: 24px;
    }

    h2 {
      font-size: 22px;
    }

    h3 {
      font-size: 20px;
    }

    img,
    .ql-video {
      width: 100%;
    }

    .ql-video {
      aspect-ratio: 16 / 9;
    }
  }

  aside {
    width: 300px;
  }

  @media screen and (max-width: 1200px) {
    gap: 30px;

    article {
      width: calc(100% - 280px);
    }

    aside {
      width: 250px;
    }
  }

  @media screen and (max-width: 992px) {
    gap: 70px;
    flex-direction: column;

    article {
      width: 100%;
    }

    aside {
      width: 100%;
      max-width: 400px;
      margin: 0 auto;
    }
  }

  @media screen and (max-width: 768px) {
    article {
      h1 {
        font-size: 20px;
      }

      h2 {
        font-size: 18px;
      }

      h3 {
        font-size: 16px;
      }

      img,
      .ql-video {
        width: 100%;
      }
    }
  }
`;

export default Wrapper;
