package com.example.Handler;

import org.springframework.stereotype.Component;
import org.telegram.telegrambots.meta.api.objects.Update;

import com.example.bot.Executer;

@Component
public class JoinHandler implements IHandle {

    private final Executer executer;

    public JoinHandler(Executer executer) {
        this.executer = executer;
    }

    @Override
    public void handle(Update update) {
        String answer = "Пока так не умеем((";
        long userId = Long.valueOf(update.getMessage().getChatId());
        executer.sendMessage(answer, userId);

    }

    @Override
    public String getInfo() {
        String answer = "Команда для регистрации на мероприятие";
        return answer;
    }

    @Override
    public String getName() {
        String answer = "/join";
        return answer;
    }

}
