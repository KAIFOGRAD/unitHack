package com.example.Handler;

import java.util.List;

import org.springframework.stereotype.Component;
import org.telegram.telegrambots.meta.api.objects.Update;
import com.example.entities.Event;
import com.example.repository.EventRepository;
import com.example.bot.Executer;

@Component
public class EventViewHandler implements IHandle {

    private final EventRepository eventRepository;
    private final Executer executer;

    public EventViewHandler(Executer executer,EventRepository eventRepository) {
        this.executer = executer;
        this.eventRepository = eventRepository;
    }

    @Override
    public void handle(Update update) {
        long userId = Long.valueOf(update.getMessage().getChatId());
        List<Event> events = eventRepository.findAll();
        if(events.isEmpty()){
            executer.sendMessage("🎭Мероприятий пока нету", userId);
            return;
        }
        StringBuilder answer = new StringBuilder("Мероприятия");
        for (Event event: events)
        {
            answer.append(formatEvent(event)).append("\n");
        }
        executer.sendMessage(answer.toString(), userId);
    }

    private Object formatEvent(Event event) {
        return String.format(
                "🔹 *%s*\n" +
                "👥 %d/%d мест\n" +
                "🎭 Организатор: @%s",
                event.getName(),
                event.getMaxSeats(),
                event.getOrganizer());
    }

    @Override
    public String getInfo() {
        String answer = "Эта команда выводит вам мероприятия которые будут";
        return answer;
    }

    @Override
    public String getName() {
        String answer = "/events";
        return answer;
    }

}
