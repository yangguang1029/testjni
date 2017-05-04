package com.example.guangyang.testjni1;

import android.util.Log;

/**
 * Created by yangguang01 on 2017/4/26.
 */

public class TestStatic1 {
    static{
        Log.e("fuck", "fuck in test1 static...");
    }
    TestStatic1(){
        Log.e("fuck", "fuck in test static1 constructor....");
    }

}
