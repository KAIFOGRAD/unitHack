package com.example.Handler;

import java.util.ArrayList;
import java.util.List;

import org.springframework.stereotype.Component;
import org.telegram.telegrambots.meta.api.objects.Update;

import com.example.bot.Executer;


@Component
public class StartHandler implements IHandle {

    private final Executer executer;

    public StartHandler(Executer executer) {
        this.executer = executer;
        // TODO Auto-generated constructor stub
    }

    @Override
    public void handle(Update update) {
        String answer = "Вы попали в NovaMeet - бот для мероприятий, Добро пожаловать! 😊" +
                "🔍Список доступных команд 🔍\r\n" + //
                "/start – запуск бота\r\n" + //
                "/help – список доступных команд\r\n" + //
                "/events – список доступных мероприятий\r\n" + //
                "/register – зарегистрироваться\r\n" + //
                "/login – войти в учетную запись";
        long userId = Long.valueOf(update.getMessage().getChatId());
        List<String> commandsName = new ArrayList<>();
        for (IHandle command : Handlers.commands.values()) {
            commandsName.add(command.getName());
        }
        executer.startKeyboardCreator(userId, commandsName, answer);

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
