'use client';

import React from 'react'

import { registerLicense } from '@syncfusion/ej2-base';
import { ScheduleComponent, MonthAgenda, TimelineMonth, TimelineViews, Day, Week, WorkWeek, Month, Agenda, Inject } from '@syncfusion/ej2-react-schedule';

registerLicense("Ngo9BigBOggjHTQxAR8/V1NCaF5cXmZCf1FpRmJGdld5fUVHYVZUTXxaS00DNHVRdkdnWXlfeHRURmhZVUNyWEM=")

function Scheduler() {
    const data = [
        {
          Id: 1,
          Subject: 'Meeting',
          StartTime: new Date(2023, 1, 15, 10, 0),
          EndTime: new Date(2023, 1, 15, 12, 30),
        },
      ];
      return (
        <ScheduleComponent
          selectedDate={new Date()}
          eventSettings={{
            dataSource: data,
          }}
        >
            <Inject services={[Day, Week, WorkWeek, Month, Agenda, MonthAgenda, TimelineViews, TimelineMonth ]} />
        </ScheduleComponent>
      );
}

export default Scheduler