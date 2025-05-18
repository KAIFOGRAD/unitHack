package com.example.Handler;

import java.util.List;

import org.springframework.stereotype.Component;
import org.telegram.telegrambots.meta.api.objects.Update;

import com.example.bot.Executer;
import com.example.repository.EventRepository;

@Component
public class LoginHandler implements IHandle {

    private final Executer executer;
    private final EventRepository eventRepository;

    public LoginHandler(Executer executer, EventRepository eventRepository) {
        this.executer = executer;
        this.eventRepository = eventRepository;
    }

    @Override
    public void handle(Update update) {
        long userId = Long.valueOf(update.getMessage().getChatId());
        String text = update.getMessage().getText().split(" ")[1];
        String text1 = update.getMessage().getText().split(" ")[2];
        executer.sendMessage(text1, userId);        
        executer.sendMessage(text, userId);
        String answer = "логика login пока в разработке";
        executer.sendMessage(answer, userId);
    }

    @Override
    public String getInfo() {
        String answer = "Эта команда для входа в свой аккаунт\n"
                + "Регестрируйся если нет аккаунта /register\n"
                + "Если аккаунт есть, то жми /login";
        return answer;
    }

    @Override
    public String getName() {
        String answer = "/login";
        return answer;
    }

}
