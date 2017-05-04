package com.example.guangyang.testjni1;

import android.util.Log;

/**
 * Created by yangguang01 on 2017/4/17.
 */

public class TestJNI {
    static{
        System.loadLibrary("test2");
    }

    public TestJNI(){

        Log.e("fuck", "fuck call native test...");
        test();
    }
    public native void  test();
}
