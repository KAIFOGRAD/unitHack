package com.example.bot;

import org.telegram.telegrambots.meta.exceptions.TelegramApiException;
import org.telegram.telegrambots.updatesreceivers.DefaultBotSession;
import org.springframework.stereotype.Component;
import org.telegram.telegrambots.meta.TelegramBotsApi;
import org.telegram.telegrambots.meta.api.methods.send.SendMessage;
import org.telegram.telegrambots.meta.generics.BotSession;

@Component
public class Executer {
    private final TelegramBotsApi botApi;
    private BotSession botSession;
    private final TelegramBot bot;

    public Executer(TelegramBot bot) throws TelegramApiException {
        this.botApi = new TelegramBotsApi(DefaultBotSession.class);
        this.bot = bot;
        this.botSession = botApi.registerBot(bot);
    }

    public void sendMessage(String messageText, long userId) {
        SendMessage message = new SendMessage();
        message.setText(messageText);
        message.setChatId(userId);

        try {
            bot.execute(message);
        } catch (TelegramApiException e) {
            System.out.println("Error sending message: " + e.getMessage());
        }
    }
}