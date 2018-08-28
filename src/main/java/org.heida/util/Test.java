package org.heida.util;

import redis.clients.jedis.Jedis;

public class Test {
    public static void main(String[] args) {
        //连接Redis服务
        Jedis jedis = new Jedis("192.168.0.145",6379);
        //查看服务是否运行
        System.out.println("Server is running:"+jedis.ping());
        System.out.println("Connection to Server successfully");
        jedis.set("title","hello");
        System.out.println(jedis.get("title"));
    }
}
