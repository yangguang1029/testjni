LOCAL_PATH := $(call my-dir)

include $(CLEAR_VARS)
LOCAL_MODULE := libtest3

LOCAL_C_INCLUDES := $(LOCAL_PATH) 
                    
LOCAL_SRC_FILES := test3.cpp


include $(BUILD_SHARED_LIBRARY)

