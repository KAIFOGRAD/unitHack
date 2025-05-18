package com.example.bot;

import org.telegram.telegrambots.meta.api.methods.send.SendMessage;
import org.telegram.telegrambots.meta.api.objects.replykeyboard.InlineKeyboardMarkup;
import org.telegram.telegrambots.meta.api.objects.replykeyboard.ReplyKeyboardMarkup;
import org.telegram.telegrambots.meta.api.objects.replykeyboard.buttons.InlineKeyboardButton;
import org.telegram.telegrambots.meta.api.objects.replykeyboard.buttons.KeyboardButton;
import org.telegram.telegrambots.meta.api.objects.replykeyboard.buttons.KeyboardRow;
import org.telegram.telegrambots.meta.exceptions.TelegramApiException;
import org.telegram.telegrambots.meta.bots.AbsSender;

import java.util.ArrayList;
import java.util.LinkedHashMap;
import java.util.List;

import org.springframework.stereotype.Component;

@Component
public class Executer {
    private final AbsSender absSender;

    public Executer(AbsSender absSender) {
        this.absSender = absSender;
    }

    public void sendMessage(String text, Long chatId) {
        SendMessage message = new SendMessage();
        message.setChatId(chatId.toString());
        message.setText(text);

        try {
            absSender.execute(message);
        } catch (TelegramApiException e) {
            System.err.println("Ошибка отправки сообщения: " + e.getMessage());
        }
    }
        private InlineKeyboardButton buttonCreator(String text, String callBack) {
        InlineKeyboardButton Button = new InlineKeyboardButton();
        Button.setText(text);
        Button.setCallbackData(callBack);
        return Button;
    }

    public void InlineKeyboardCreator(long chatId) {
        SendMessage message = new SendMessage();
        message.enableMarkdown(true);
        message.setChatId(chatId);
        message.setText("Вот быстрые подсказки для пользования ботом ");
        InlineKeyboardMarkup markupInLine = new InlineKeyboardMarkup();
        List<List<InlineKeyboardButton>> rowsLine = new ArrayList<>();
        InlineKeyboardButton helpButton = buttonCreator("Помощь", "/help");
        InlineKeyboardButton regButton = buttonCreator("регистрация", "/register");
        List<InlineKeyboardButton> rowLine1 = new ArrayList();
        List<InlineKeyboardButton> rowLine2 = new ArrayList();
        rowLine1.add(helpButton);
        rowLine2.add(regButton);
        rowsLine.add(rowLine1);
        rowsLine.add(rowLine2);
        markupInLine.setKeyboard((rowsLine));
        message.setReplyMarkup(markupInLine);
        try {
            absSender.execute(message);
        } catch (TelegramApiException e) {
            e.printStackTrace();
        }
    }

    public void startKeyboardCreator(long chatId, List<String> buttonText, String text) {
        SendMessage message = new SendMessage();
        message.setChatId(chatId);
        message.setText(text);
        ReplyKeyboardMarkup keyboardMarkup = new ReplyKeyboardMarkup();
        keyboardMarkup.setSelective(true);
        keyboardMarkup.setResizeKeyboard(true);
        keyboardMarkup.setOneTimeKeyboard(false);
        List<KeyboardRow> keyboard = new ArrayList<>();
        KeyboardRow rows = new KeyboardRow();
        List<String> keysList = buttonText;

        for (int i = 0; i < buttonText.size(); i++) {
            rows.add(new KeyboardButton(keysList.get(i)));
        }
        keyboard.add(rows);
        keyboardMarkup.setKeyboard(keyboard);
        message.setReplyMarkup(keyboardMarkup);
        try {
            absSender.execute(message);
        } catch (TelegramApiException e) {
            e.printStackTrace();
        }
    }

    public KeyboardRow keyboardRows(LinkedHashMap buttonText) {
        KeyboardRow rows = new KeyboardRow();
        List<String> keysList = new ArrayList<>(buttonText.keySet());
        for (int i = 0; i < keysList.size(); i++) {
            rows.add(new KeyboardButton(keysList.get(i)));
        }
        return rows;
    }

}
