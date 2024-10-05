import React from 'react';
import { View, Text, ScrollView, StyleSheet, Image, TouchableOpacity } from 'react-native';

const HomeUser = ({ navigation }) => {
    return (
        <ScrollView style={styles.container}>
            <View style={styles.profileContainer}>
                <Image 
                    source={{ uri: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTHLplp-juVo7t_CaOZrdLBVjc19DbXXFkiCQ&sle-image-url' }} 
                    style={styles.profileImage} 
                />
                <Text style={styles.profileName}>NGUYEN BAO LONG</Text>
                <Text style={styles.points}>0 điểm IVIE</Text>
                <TouchableOpacity style={styles.updateButton} onPress={() => navigation.navigate('EditProfile')}>
                    <Text style={styles.updateButtonText}>Cập nhật</Text>
                </TouchableOpacity>
            </View>

            <View style={styles.membershipContainer}>
                <Text style={styles.membershipText}>Thành viên mới</Text>
                <Text style={styles.membershipInfo}>
                    Bạn cần thêm 1 điểm tích lũy để lên hạng Hạng Thành Viên
                </Text>
            </View>

            <View style={styles.sectionContainer}>
                <Text style={styles.sectionTitle}>Tiện ích</Text>
                <View style={styles.iconRow}>
                    <TouchableOpacity style={styles.iconItem}>
                        <Image 
                            // source={require('./assets/icon_sos.png')} 
                            style={styles.iconImage} 
                        />
                        <Text style={styles.iconText}>Gọi bác sĩ khẩn cấp</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.iconItem}>
                        <Image 
                            // source={require('./assets/icon_doctor_chat.png')} 
                            style={styles.iconImage} 
                        />
                        <Text style={styles.iconText}>Hỏi riêng Bác sĩ</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.iconItem}>
                        <Image 
                            // source={require('./assets/icon_heart_rate.png')} 
                            style={styles.iconImage} 
                        />
                        <Text style={styles.iconText}>Theo dõi chỉ số</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.iconItem}>
                        <Image 
                            // source={require('./assets/icon_discount.png')} 
                            style={styles.iconImage} 
                        />
                        <Text style={styles.iconText}>Ưu đãi của tôi</Text>
                    </TouchableOpacity>
                </View>
            </View>

            <View style={styles.sectionContainer}>
                <Text style={styles.sectionTitle}>Dịch vụ của bạn</Text>
                <View style={styles.iconRow}>
                    <TouchableOpacity style={styles.iconItem}>
                        <Image 
                            // source={require('./assets/icon_calendar.png')} 
                            style={styles.iconImage} 
                        />
                        <Text style={styles.iconText}>Lịch khám</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.iconItem}>
                        <Image 
                            // source={require('./assets/icon_orders.png')} 
                            style={styles.iconImage} 
                        />
                        <Text style={styles.iconText}>Đơn hàng</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.iconItem}
                                      onPress={() => navigation.navigate('HealthProfile')}>
                        <Image 
                            // source={require('./assets/icon_health_profile.png')} 
                            style={styles.iconImage} 
                        />
                        <Text style={styles.iconText}>Hồ sơ sức khỏe</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.iconItem}>
                        <Image 
                            // source={require('./assets/icon_family.png')} 
                            style={styles.iconImage} 
                        />
                        <Text style={styles.iconText}>Thành viên gia đình</Text>
                    </TouchableOpacity>
                </View>
            </View>

            <View style={styles.settingsContainer}>
                <TouchableOpacity style={styles.settingsItem}>
                    <Text style={styles.settingsText}>Thiết lập ứng dụng</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.settingsItem}>
                    <Text style={styles.settingsText}>Tài khoản</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.settingsItem}>
                    <Text style={styles.settingsText}>Chính sách và hỗ trợ</Text>
                </TouchableOpacity>
            </View>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    profileContainer: {
        alignItems: 'center',
        paddingVertical: 20,
        backgroundColor: '#f5f5f5',
    },
    profileImage: {
        width: 100,
        height: 100,
        borderRadius: 50,
    },
    profileName: {
        fontSize: 20,
        fontWeight: 'bold',
        marginTop: 10,
    },
    points: {
        fontSize: 16,
        color: '#ff9900',
        marginVertical: 5,
    },
    updateButton: {
        backgroundColor: '#4caf50',
        paddingHorizontal: 20,
        paddingVertical: 10,
        borderRadius: 20,
    },
    updateButtonText: {
        color: '#fff',
        fontWeight: 'bold',
    },
    membershipContainer: {
        backgroundColor: '#fffbe0',
        padding: 15,
        marginVertical: 10,
    },
    membershipText: {
        fontWeight: 'bold',
        fontSize: 16,
    },
    membershipInfo: {
        color: '#999',
        marginTop: 5,
    },
    sectionContainer: {
        marginVertical: 10,
        paddingHorizontal: 15,
    },
    sectionTitle: {
        fontSize: 16,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    iconRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    iconItem: {
        alignItems: 'center',
        width: '23%',
    },
    iconImage: {
        width: 50,
        height: 50,
        marginBottom: 5,
    },
    iconText: {
        textAlign: 'center',
        fontSize: 12,
        color: '#333',
    },
    settingsContainer: {
        marginVertical: 20,
        paddingHorizontal: 15,
    },
    settingsItem: {
        paddingVertical: 15,
        borderBottomWidth: 1,
        borderBottomColor: '#eee',
    },
    settingsText: {
        fontSize: 16,
    },
});

export default HomeUser;
