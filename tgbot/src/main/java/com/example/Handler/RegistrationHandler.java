package com.example.Handler;

import org.springframework.stereotype.Component;
import org.telegram.telegrambots.meta.api.objects.Update;

import com.example.bot.Executer;

@Component
public class RegistrationHandler implements IHandle {

    private final Executer executer;
    public RegistrationHandler(Executer executer) {
        this.executer=executer;
        //TODO Auto-generated constructor stub
    }

    @Override
    public void handle(Update update) {
        long userId = Long.valueOf(update.getMessage().getChatId());
        String answer = "Нам приятно что ты пользуешься нашим продуктом ❤️\r\n" +
                        "Для дальнейшей регистрации перейди на официальный сайт  Naumen NovaMeet\r\n" +
                        "Будем рады видеть тебя снова !";
        executer.sendMessage(answer, userId);
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
