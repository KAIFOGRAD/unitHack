package com.example.Handler;

import org.telegram.telegrambots.meta.api.objects.Update;

import com.example.bot.Executer;

public class RegistrationHandler extends Executer implements IHandle {

    @Override
    public void handle(Update update) {
        long userId = Long.valueOf(update.getMessage().getChatId());
        String answer = "логика registration пока в разработке";
        sendMessage(answer, userId);
    }

    @Override
    public String getInfo() {
        String answer = "Эта команда нужна для регистрации\n"
                + "Регестрируйся если нет аккаунта /register\n"
                + "Если аккаунт есть, то жми /login";
        return answer;
    }

    @Override
    public String getName() {
        String answer = "/register";
        return answer;
    }

}
