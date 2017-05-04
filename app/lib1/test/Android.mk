LOCAL_PATH:= $(call my-dir)
include $(CLEAR_VARS)
LOCAL_MODULE := test11



LOCAL_SRC_FILES := $(TARGET_ARCH_ABI)/libtest1.so
                   
include $(PREBUILT_SHARED_LIBRARY)