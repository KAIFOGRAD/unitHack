package com.example.Handler;

import org.springframework.stereotype.Component;
import org.telegram.telegrambots.meta.api.objects.Update;

import com.example.bot.Executer;

@Component
public class StartHandler extends Executer implements IHandle {

    @Override
    public void handle(Update update) {
        String answer = "Вы попали в бота наумен для мероприятий, Добро пожаловать!";
        long userId = Long.valueOf(update.getMessage().getChatId());
        sendMessage(answer, userId);

    }

    @Override
    public String getInfo() {
        String info = "комманда для начала работы с ботом";
        return info;
    }

    @Override
    public String getName() {
        String name = "/start";
        return name;
    }

}
