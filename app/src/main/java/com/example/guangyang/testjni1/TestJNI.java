package com.example.guangyang.testjni1;

/**
 * Created by yangguang01 on 2017/4/17.
 */

public class TestJNI {
    static{
        System.loadLibrary("test2");
    }

    public TestJNI(){
        test();
    }
    public native void  test();
}
