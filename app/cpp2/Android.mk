LOCAL_PATH := $(call my-dir)

include $(CLEAR_VARS)
LOCAL_MODULE := libtest2

LOCAL_C_INCLUDES := $(LOCAL_PATH) \
                     $(LOCAL_PATH)/../cpp1
LOCAL_SRC_FILES := test2.cpp

LOCAL_SHARED_LIBRARIES := libtest11

include $(BUILD_SHARED_LIBRARY)

$(call import-add-path,$(LOCAL_PATH)/../)
$(call import-module,lib1)