package com.example;

import com.example.bot.TelegramBot;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;
import org.telegram.telegrambots.meta.TelegramBotsApi;
import org.telegram.telegrambots.meta.exceptions.TelegramApiException;
import org.telegram.telegrambots.updatesreceivers.DefaultBotSession;

@SpringBootApplication
public class Main {
    public static void main(String[] args)  {
        SpringApplication.run(Main.class,args);
    }

    @Bean
    public TelegramBotsApi botsApi(TelegramBot bot) throws TelegramApiException{
        TelegramBotsApi api = new TelegramBotsApi(DefaultBotSession.class);
        api.registerBot(bot);
        return api; 
    }
}