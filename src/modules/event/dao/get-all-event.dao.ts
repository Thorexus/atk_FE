import BaseDAO from 'common/service/dao/base.dao';
import { AllEventResponse, EventResponse } from 'modules/data-contractor';

export type GetAllEventResponseDAO = {
  totalPage: number;
  data: EventResponse[];
};

export default class GetAllEventDAO implements BaseDAO<GetAllEventResponseDAO> {
  private response;

  constructor(data: AllEventResponse) {
    this.response = data;
  }

  getBodyJSON = () => ({
    totalPage: this.response.totalPage,
    data: this.response.data.map(item => {
      return {
        ...item,
        date: item.date_open,
        hour: item.hr_open,
        minute: item.minute_open,
        status: item.event_status,
        eventStatus: item.event_status,
        dateClose: item.date_close,
        hourClose: item.hr_close,
        minuteClose: item.minute_close,
      };
    }),
  });
}
