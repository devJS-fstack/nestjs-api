import { ArgumentMetadata, PipeTransform } from '@nestjs/common'

export default class PipeBefore implements PipeTransform {
    transform(req: any, metadata: ArgumentMetadata) {
        console.log(req)
        return req
    }
}