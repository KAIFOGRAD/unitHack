package com.example.Handlers;

import org.telegram.telegrambots.meta.api.methods.send.SendMessage;
import org.telegram.telegrambots.meta.api.objects.Update;

public class StartHandler implements IHandle {

    @Override
    public SendMessage handle(Update update) {
        String answer = "Вы попали в бота наумен для мероприятий, Добро пожаловать!";
        long userId = Long.valueOf(update.getMessage().getChatId());

        SendMessage message = new SendMessage();
        message.setChatId(userId);
        message.setText(answer);
        return message;

    }

    @Override
    public String info() {
        String info = "комманда для начала работы с ботом";
        return info;
    }

    @Override
    public String name() {
        String name = "/start";
        return name;
    }

}
