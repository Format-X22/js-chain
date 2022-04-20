import { ApiProperty, ApiPropertyOptional, ApiPropertyOptions } from '@nestjs/swagger';
import { applyDecorators } from '@nestjs/common';
import { Transform } from 'class-transformer';
import { IsNotEmpty } from 'class-validator';

type TPropertyOptions = ApiPropertyOptions & {
    isRequired?: boolean;
};

export function Property(options: TPropertyOptions = {}): PropertyDecorator {
    const isArray = options.isArray;
    let swaggerWrapper;

    if (options.isRequired) {
        swaggerWrapper = ApiProperty;
    } else {
        swaggerWrapper = ApiPropertyOptional;
    }

    if (!options.enum && !options.enumName && options.isArray) {
        delete options.isArray;
    }

    const customWrapper = function (target: Record<string, unknown>, propertyKey: string | symbol) {
        const typeMeta = Reflect.getMetadata('design:type', target, propertyKey);

        if (typeMeta.name === 'Boolean') {
            TransformBooleanFix()(target, propertyKey);
        }

        if (isArray) {
            AddCommasSupport()(target, propertyKey);
        }

        if (options.isRequired) {
            IsNotEmpty()(target, propertyKey);
        }
    };

    return applyDecorators(swaggerWrapper(options), customWrapper);
}

// https://github.com/typestack/class-transformer/issues/626
export function TransformBooleanFix() {
    return Transform(({ obj, key }) => {
        return Boolean([true, 'enabled', 'true'].indexOf(obj[key]) + 1);
    });
}

export function AddCommasSupport(): PropertyDecorator {
    return Transform(({ value }) => {
        return addCommasSupportForValue(value);
    });
}

export function addCommasSupportForValue(value: string | Array<string>): Array<string> {
    return Array.isArray(value) ? value : value.split(',');
}
