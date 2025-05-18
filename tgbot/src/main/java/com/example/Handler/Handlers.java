package com.example.Handler;

import java.util.LinkedHashMap;
import java.util.Map;

import org.springframework.stereotype.Service;
import org.telegram.telegrambots.meta.api.objects.Update;
import com.example.repository.EventRepository;

@Service
public class Handlers {

    public static final Map<String, IHandle> commands = new LinkedHashMap<>();
    
    public Handlers(
        StartHandler startHandler,
        HelpHandler helpHandler,
        EventViewHandler eventViewHandler,
        RegistrationHandler registrationHandler,
        LoginHandler loginHandler
    ) {
        startHandler.register(commands);
        helpHandler.register(commands);
        eventViewHandler.register(commands);
        registrationHandler.register(commands);
        loginHandler.register(commands);
    }

    public void Handle(Update update) {
        String command = update.getMessage().getText();
        command = command.split(" ")[0];
        commands.get(command).handle(update);
    }

}
