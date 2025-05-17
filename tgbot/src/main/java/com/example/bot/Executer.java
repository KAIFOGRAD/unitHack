package com.example.bot;

import org.telegram.telegrambots.meta.api.objects.Update;
import org.telegram.telegrambots.meta.exceptions.TelegramApiException;
import org.telegram.telegrambots.meta.api.methods.send.SendMessage;

public class Executer extends TelegramBot {
    public void sendMessage(String messageText, long userId) {
        SendMessage message = new SendMessage();
        message.setText(messageText);
        message.setChatId(userId);

        try {
            execute(message);
        } catch (TelegramApiException e) {
            System.out.println("Uncorrected" + e);
        }
    }
}
