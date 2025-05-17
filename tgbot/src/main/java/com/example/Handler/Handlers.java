package com.example.Handler;

import java.util.LinkedHashMap;
import java.util.Map;

import org.telegram.telegrambots.meta.api.objects.Update;

public class Handlers {
    public static Map<String, IHandle> commands = new LinkedHashMap<>();

    public Handlers() {
        registerCommands();
    }

    private void registerCommands() {
        new StartHandler().register(commands);
        new HelpHandler().register(commands);
    }

    public void Handle(Update update) {
        String command = update.getMessage().getText();
        command = command.split(" ")[0];
        commands.get(command).handle(update);
    }

}
