import axios, { AxiosResponse } from 'axios';

const url = 'http://localhost:3200/';

const requests = {
  // pass in (callback)
  getAnswer: (answerID: number, callback: Function) => {
    axios.get(`${url}answer/${answerID}`)
      .then((res: AxiosResponse<any, any>) => {
        const data = {
          answerID: res.data.answerID,
          answer: res.data.answer,
          synonym: res.data.synonym,
        };
        callback(data);
      })
      .catch((err: any) => console.error('err:', err));
  },
};

export default requests;
