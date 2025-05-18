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
        executer.sendMessage("Мероприятия", userId);
        for (Event event: events)
        {
            executer.sendMessage(formatEvent(event),userId);

        }
    }

    private String formatEvent(Event event) {
        StringBuilder answer = new StringBuilder();
        answer.append("🔹 ")
            .append(event.getName())    
            .append("\n👥 ")
            .append(event.getNumberSeats())
            .append(" \\")
            .append(event.getMaxSeats())
            .append("\n🎭")
            .append(event.getDescription());
        return answer.toString();
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
