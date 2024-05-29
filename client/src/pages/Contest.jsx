/* eslint-disable react-refresh/only-export-components */
import { createContext, useContext, useEffect, useState } from 'react';
import { useHomeLayoutContext } from './HomeLayout';
import Wrapper from '../assets/wrappers/Contest';
import { redirect, useLoaderData, useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';
import customFetch from '../utils/customFetch';
import { GiTrophyCup } from 'react-icons/gi';
import PageBtnContainer from '../components/admin/PageBtnContainer';

const rankingQuery = (params) => {
  const { page } = params;
  return {
    queryKey: ['ranking', page ?? 1],
    queryFn: async () => {
      const { data } = await customFetch.get('/tests/ranking', {
        params,
      });
      return data;
    },
    staleTime: 0,
  };
};

export const loader =
  (queryClient) =>
  async ({ request }) => {
    try {
      const params = Object.fromEntries([
        ...new URL(request.url).searchParams.entries(),
      ]);
      return await queryClient.fetchQuery(rankingQuery(params));
    } catch (error) {
      return redirect('/');
    }
  };

const ContestContext = createContext();

const Contest = () => {
  const navigate = useNavigate();
  const data = useLoaderData();
  const { currentUserData } = useHomeLayoutContext();
  const [rankingList, setRankingList] = useState([]);
  const { setCategoryName } = useHomeLayoutContext();

  useEffect(() => {
    setCategoryName(
      'Cuộc thi trực tuyến tìm hiểu về cuộc đời, thân thế, sự nghiệp của Chủ tịch Hồ Chí Minh'
    );
  }, []);

  const formatTime = (time) => {
    if (!time) return '--/--';
    const minutes = Math.floor(time / 60);
    const seconds = time % 60;
    return `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(
      2,
      '0'
    )}`;
  };

  const formatDate = (dateData) => {
    const date = new Date(dateData);
    return `${String(date.getDate()).padStart(2, '0')}-${String(
      date.getMonth() + 1
    ).padStart(2, '0')}-${date.getFullYear()}`;
  };

  useEffect(() => {
    if (!data) return;
    setRankingList(
      data.tests.map((test, index) => ({
        ...test,
        number: index + 1,
        completionTime: formatTime(test.completionTime),
        date: formatDate(test.createdAt),
      }))
    );
  }, [data]);

  const handleStartContest = () => {
    const test = {
      start: true,
      startTime: new Date(),
    };

    Cookies.set('test', JSON.stringify(test));

    return navigate('/test');
  };

  return (
    <ContestContext.Provider value={{ data }}>
      <Wrapper>
        <div className="intro-section">
          <div className="contest-info">
            <div className="title">Thông tin cuộc thi</div>
            <div className="info-container">
              <div className="info">
                <span className="number">30</span>
                <span className="unit">phút</span>
              </div>
              <div className="info">
                <span className="number">30</span>
                <span className="unit">câu</span>
              </div>
            </div>
          </div>
          <button className="btn" onClick={handleStartContest}>
            Vào thi
          </button>
        </div>
        {rankingList.length !== 0 && (
          <div className="ranking-container">
            <div className="title">Bảng xếp hạng</div>
            <div className="ranking-table-container">
              <table className="ranking-table">
                <thead>
                  <tr>
                    <th>#</th>
                    <th>Người thi</th>
                    <th>Điểm</th>
                    <th>Thời gian thi</th>
                    <th>Ngày thi</th>
                  </tr>
                </thead>
                <tbody>
                  {rankingList.map((data) => (
                    <tr
                      className={`ranking-row ${
                        data.userId === currentUserData?.user?._id
                          ? 'highlight'
                          : ''
                      }`}
                      key={data._id}
                    >
                      {data.number <= 3 ? (
                        <td className={`trophy trophy-${data.number}`}>
                          <GiTrophyCup />
                        </td>
                      ) : (
                        <td className="number">{data.number}</td>
                      )}
                      <td className="name">{data.userName}</td>
                      <td className="score">{data.score}</td>
                      <td className="time">{data.completionTime}</td>
                      <td className="date">{data.date}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            {data?.numOfPages > 1 && <PageBtnContainer type="ranking" />}
          </div>
        )}
      </Wrapper>
    </ContestContext.Provider>
  );
};

export const useContestContext = () => {
  return useContext(ContestContext);
};

export default Contest;
