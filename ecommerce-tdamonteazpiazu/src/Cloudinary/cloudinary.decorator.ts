import { applyDecorators } from "@nestjs/common"
import { ApiBody, ApiConsumes, ApiOperation } from "@nestjs/swagger"

export const UploadImageDecorator = () => {
    return applyDecorators(
        ApiOperation({summary: 'Upload image', description: 'Recibe por parámetro el ID de un producto y por body la imagen a subir.'}),
        ApiConsumes('multipart/form-data'),
        ApiBody({
        schema: {
            type: 'object',
            properties: {
                file: {
                    type: 'string',
                    format: 'binary'
                }
            }
        }
    })
    )
}