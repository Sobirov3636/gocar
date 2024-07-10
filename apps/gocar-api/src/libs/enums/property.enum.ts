import { registerEnumType } from '@nestjs/graphql';

export enum PropertyType {
	COMPACT_CAR = 'COMPACT_CAR', // 경차, 소형차
	MID_SIZE_CAR = 'MID_SIZE_CAR', // 중형차
	FULL_SIZED_CAR = 'FULL_SIZED_CAR', // 대형차
	VAN = 'VAN', // 승합차
	TRUCK = 'TRUCK', // 화물차
}
registerEnumType(PropertyType, {
	name: 'PropertyType',
});

export enum PropertyFuel {
	GASOLINE = 'GASOLINE',
	DIESEL = 'DIESEL',
	LPG = 'LPG',
	ELECTR = 'ELECTR',
	HYBRID = 'HYBRID',
}
registerEnumType(PropertyFuel, {
	name: 'PropertyFuel',
});

export enum PropertyTransmission {
	AUTOMATIC = 'AUTOMATIC',
	MANUAL = 'MANUAL',
}
registerEnumType(PropertyTransmission, {
	name: 'PropertyTransmission',
});

export enum PropertyOptions {
	LEATHER_SEATS = 'LEATHER_SEATS',
	HEATED_SEATS = 'HEATED_SEATS',
	VENTILATED_SEATS = 'VENTILATED_SEATS',
	HEATED_STEERING_WHEEL = 'HEATED_STEERING_WHEEL',
	NAVIGATION = 'NAVIGATION',
	CRUISE_CONTROL = 'CRUISE_CONTROL',
	PARKING_SENSORS = 'PARKING_SENSORS',
	REAR_CAMERA = 'REAR_CAMERA',
	REAR_CROSS_TRAFFIC_ALERT = 'REAR_CROSS_TRAFFIC_ALERT',
	EMERGENCY_BRAKING = 'EMERGENCY_BRAKING',
	AROUND_VIEW = 'AROUND_VIEW',
	LANE_DEPARTURE_WARNING = 'LANE_DEPARTURE_WARNING',
}
registerEnumType(PropertyOptions, {
	name: 'PropertyOptions',
});

export enum PropertyManufacture {
	DOMESTIC = 'DOMESTIC',
	IMPORT = 'IMPORT',
}
registerEnumType(PropertyManufacture, {
	name: 'PropertyManufacture',
});

export enum PropertyDomestic {
	HYUNDAI = 'HYUNDAI',
	KIA = 'KIA',
	GENESIS = 'GENESIS',
	CHEVROLET = 'CHEVROLET',
}
registerEnumType(PropertyDomestic, {
	name: 'PropertyDomestic',
});

export enum PropertyImported {
	BMW = 'BMW',
	TOYOTA = 'TOYOTA',
	NISSAN = 'NISSAN',
	LEXUS = 'LEXUS',
	VOLVO = 'VOLVO',
	AUDI = 'AUDI',
	BUGATTI = 'BUGATTI',
	BENTLY = 'BENTLY',
	JAGUAR = 'JAGUAR',
	JEEP = 'JEEP',
	TESLA = 'TESLA',
	VOLKSWAGEN = 'VOLKSWAGEN',
	PORSCHE = 'PORSCHE',
	FERRARI = 'FERRARI',
	LAMBORGHINI = 'LAMBORGHINI',
}
registerEnumType(PropertyImported, {
	name: 'PropertyImported',
});

export enum PropertyStatus {
	// HOLD = 'HOLD',
	ACTIVE = 'ACTIVE',
	SOLD = 'SOLD',
	DELETE = 'DELETE',
}
registerEnumType(PropertyStatus, {
	name: 'PropertyStatus',
});

export enum PropertyLocation {
	SEOUL = 'SEOUL',
	BUSAN = 'BUSAN',
	INCHEON = 'INCHEON',
	DAEGU = 'DAEGU',
	GYEONGJU = 'GYEONGJU',
	GWANGJU = 'GWANGJU',
	CHONJU = 'CHONJU',
	DAEJON = 'DAEJON',
	JEJU = 'JEJU',
}
registerEnumType(PropertyLocation, {
	name: 'PropertyLocation',
});
