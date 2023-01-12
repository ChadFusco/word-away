import axios, { AxiosResponse } from 'axios';

const url = 'http://localhost:3200/';

const requests = {
  // pass in (callback)
  getAnswer: (id: number, callback: Function) => {
    console.log('id:', id);
    axios.get(`${url}answer/${id}`)
      .then((res: AxiosResponse<any, any>) => {
        console.log('res:', res);
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
