package com.example.Handler;

import org.springframework.stereotype.Component;
import org.telegram.telegrambots.meta.api.objects.Update;

import com.example.bot.Executer;

@Component
public class HelpHandler implements IHandle {

    private final Executer executer;

    public HelpHandler(Executer executer) {
        this.executer = executer;
    }

    @Override
    public void handle(Update update) {
        String helpTo = update.getMessage().getText();
        long userId = Long.valueOf(update.getMessage().getChatId());
        String answer = "";

        if (helpTo.equals(this.getName())) {
            StringBuilder helpMessage = new StringBuilder("🔍Список доступных команд 🔍\n");
            for (IHandle command : Handlers.commands.values()) {
                helpMessage.append(command.getName()).append("\n");
            }
            answer = helpMessage.toString();
        } else {
            int spaceIndex = helpTo.indexOf(" ");
            helpTo = "/" + helpTo.substring(spaceIndex).trim();
            IHandle commandName = Handlers.commands.get(helpTo);
            if (commandName != null) {
                answer = commandName.getInfo();

            } else {
                answer = "❌ такой комманды нет ❌\n" +
                        "Воспользуйся /help, что бы узнать какие комманды есть";
            }
        }
        executer.sendMessage(answer, userId);
    }

    @Override
    public String getInfo() {
        String answer = "Эта команда дает информацию о работе команды \n напишите" +
                " /help 'название команды' и получите подробности о её работые";
        return answer;
    }

    @Override
    public String getName() {
        return "/help";
    }

}
