import { useState } from "react";
import FullCalendar from "@fullcalendar/react";
import { formatDate } from "@fullcalendar/core";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import listPlugin from "@fullcalendar/list";
import { Box, List, ListItem, ListItemText, Typography, useTheme, CircularProgress } from "@mui/material";
import Header from "../components/Header";
import { token } from "../Theme";
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import api from '../api/Api';

const Calendar = () => {
  const theme = useTheme();
  const colors = token(theme.palette.mode);
  const queryClient = useQueryClient();

  const { data: events, isLoading } = useQuery({
    queryKey: ['events'],
    queryFn: async () => {
      const response = await api.get('/event');
      return response.data;
    },
  });

  const addEventMutation = useMutation({
    mutationFn: async (newEvent) => {
      const response = await api.post('/event', newEvent);
      console.log("Event added:", response.data);
    },
    onSuccess: () => {
      queryClient.invalidateQueries(['events']); 
    },
  });

  const deleteEventMutation = useMutation({
    mutationFn: async (eventId) => {
      await api.delete(`/event/${eventId}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries(['events']); 
    },
  });

  const handleDateClick = (selected) => {
    const title = prompt("Please enter a new title for your event");
    const calendarApi = selected.view.calendar;
    calendarApi.unselect();

    if (title) {
      const newEvent = {
        event: title,
        date: new Date(selected.startStr).toISOString(), // تحويل التاريخ إلى ISO string
      };
      
      console.log("Adding event:", newEvent);

      addEventMutation.mutate(newEvent);
    }
  };

  const handleEventClick = (selected) => {
    if (window.confirm(`Are you sure you want to delete the event '${selected.event.title}'?`)) {
      deleteEventMutation.mutate(selected.event.id);
    }
  };

  const calendarEvents = events?.map(event => ({
    id: event.id,
    title: event.event,
    start: new Date(event.date).toISOString(), // تحويل التاريخ إلى ISO string
  }));

  return (
    <Box m="20px">
      <Header title="Calendar" subtitle="Full Calendar Interactive Page" />

      <Box display="flex" justifyContent="space-between">
        {/* CALENDAR SIDEBAR */}
        <Box
          flex="1 1 20%"
          backgroundColor={colors.primary[400]}
          p="15px"
          borderRadius="4px"
        >
          <Typography variant="h5">Events</Typography>
          {isLoading ? (
            <CircularProgress />
          ) : (
            <List>
              {events?.map((event) => (
                <ListItem
                  key={event.id}
                  sx={{
                    backgroundColor: colors.greenAccent[500],
                    margin: "10px 0",
                    borderRadius: "2px",
                  }}
                >
                  <ListItemText
                    primary={event.event}
                    secondary={
                      <Typography>
                        {formatDate(event.date, {
                          year: "numeric",
                          month: "short",
                          day: "numeric",
                        })}
                      </Typography>
                    }
                  />
                </ListItem>
              ))}
            </List>
          )}
        </Box>

        {/* CALENDAR */}
        <Box flex="1 1 100%" ml="15px">
          <FullCalendar
            height="75vh"
            plugins={[
              dayGridPlugin,
              timeGridPlugin,
              interactionPlugin,
              listPlugin,
            ]}
            headerToolbar={{
              left: "prev,next today",
              center: "title",
              right: "dayGridMonth,timeGridWeek,timeGridDay,listMonth",
            }}
            initialView="dayGridMonth"
            editable={true}
            selectable={true}
            selectMirror={true}
            dayMaxEvents={true}
            select={handleDateClick}
            eventClick={handleEventClick}
            events={calendarEvents}
          />
        </Box>
      </Box>
    </Box>
  );
};

export default Calendar;
