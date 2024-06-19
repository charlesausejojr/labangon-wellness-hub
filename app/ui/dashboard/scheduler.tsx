'use client';
// needs to be client

import React from 'react'
import { registerLicense } from '@syncfusion/ej2-base';
import { ScheduleComponent, MonthAgenda, TimelineMonth, TimelineViews, Day, Week, WorkWeek, Month, Agenda, Inject, PopupOpenEventArgs, popupOpen } from '@syncfusion/ej2-react-schedule';
import { Event } from '@/src/generated/client';

registerLicense("Ngo9BigBOggjHTQxAR8/V1NCaF5cXmZCf1FpRmJGdld5fUVHYVZUTXxaS00DNHVRdkdnWXlfeHRURmhZVUNyWEM=")

interface EventData {
  Id: String,
  Subject: String,
  Description: String | null,
  StartTime: Date,
  EndTime: Date
}
interface CustomElement extends Element {
  ej2_instances: any[]; // Adjust the type of ej2_instances as needed
}

function Scheduler(
  {events} : {events : Event[]}
) {

    const data = [
        {
          Id: 1,
          Subject: 'Meeting',
          Description: 'Test Meeting',
          StartTime: new Date(2024, 6, 18, 10, 0),
          EndTime: new Date(2024, 6, 18, 12, 30),
        },
      ];


      const eventData : EventData[] = [];
      events.map((event) => {
        eventData.push(
          {
            Id: event.id,
            Subject: event.title,
            Description: event.description,
            StartTime: event.startDate,
            EndTime: event.endDate
          }
        )
      });

      return (
        <ScheduleComponent
          popupOpen={ (args) => {
            if (args.target?.classList.contains("e-work-cells")) {
              args.cancel = true;
              return;
            }
            var deleteButtonElement = (args.type === "QuickInfo") ? ".e-event-popup .e-delete" : ".e-schedule-dialog .e-event-delete";
            var editButtonElement = (args.type === "QuickInfo") ? ".e-event-popup .e-edit" : ".e-schedule-dialog .e-event-edit";
            var deleteButton = document.querySelector(deleteButtonElement);
            var editButton = document.querySelector(editButtonElement);
            if (deleteButton != null && editButton != null)  {
              (deleteButton as CustomElement).ej2_instances[0].disabled = true; 
              (editButton as CustomElement).ej2_instances[0].disabled = true; 
            }
          }}
          showQuickInfo={true}
          readOnly={true}
          height='550px'
          selectedDate={new Date()}
          eventSettings={{
            dataSource: eventData,
          }}
          currentView='Month'
        >
            <Inject services={[Day, Week, WorkWeek, Month, Agenda, MonthAgenda, TimelineViews, TimelineMonth ]} />
        </ScheduleComponent>
      );
}

export default Scheduler