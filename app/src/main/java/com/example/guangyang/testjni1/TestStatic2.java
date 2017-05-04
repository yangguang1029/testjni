package com.example.guangyang.testjni1;

import android.util.Log;

/**
 * Created by yangguang01 on 2017/4/26.
 */

public class TestStatic2 {

    static{
        Log.e("fuck", "fuck in test2 static...");
    }

    TestStatic2(){
        Log.e("fuck", "fuck in test static2 constructor....");
    }
}
