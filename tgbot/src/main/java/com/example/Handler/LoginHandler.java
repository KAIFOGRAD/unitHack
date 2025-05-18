package com.example.Handler;

import org.springframework.stereotype.Component;
import org.telegram.telegrambots.meta.api.objects.Update;

import com.example.bot.Executer;

@Component
public class LoginHandler implements IHandle{

    private final Executer executer;

    public LoginHandler(Executer executer) {
        this.executer =executer;
        //TODO Auto-generated constructor stub
    }

    @Override
    public void handle(Update update) {
        long userId = Long.valueOf(update.getMessage().getChatId());
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
