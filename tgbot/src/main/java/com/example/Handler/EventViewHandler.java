package com.example.Handler;

import org.telegram.telegrambots.meta.api.objects.Update;

import com.example.bot.Executer;

public class EventViewHandler extends Executer implements IHandle {

    @Override
    public void handle(Update update) {
        long userId = Long.valueOf(update.getMessage().getChatId());
        String answer = "логика events пока в разработке";
        sendMessage(answer, userId);
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
