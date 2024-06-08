import { Controller, FileTypeValidator, MaxFileSizeValidator, Param, ParseFilePipe, ParseUUIDPipe, Post, UploadedFile, UseGuards, UseInterceptors } from "@nestjs/common";
import { CloudinaryService } from "./cloudinary.service";
import { FileInterceptor } from "@nestjs/platform-express";
import { ProductsService } from "../Products/products.service";
import { AuthorizationGuard } from "../guards/authorization.guard";
import { ApiBearerAuth, ApiBody, ApiConsumes, ApiOperation, ApiTags } from "@nestjs/swagger";
import { UploadImageDecorator } from "./cloudinary.decorator";

@ApiTags('Files')
@Controller('files')
export class CloudinaryController {
    constructor(private readonly cloudinaryService: CloudinaryService,
        private readonly productService: ProductsService
    ) {}

    @Post('uploadImage/:id')
    @UploadImageDecorator()
    @ApiBearerAuth()
    @UseGuards(AuthorizationGuard)
    @UseInterceptors(FileInterceptor('file'))
    async uploadImage(
        @Param("id", ParseUUIDPipe) id: string,
        @UploadedFile(new ParseFilePipe({
            validators: [
                new MaxFileSizeValidator({
                    maxSize: 200000,
                    message: "El tamaño máximo es de 200KB"
                }),
                new FileTypeValidator({
                    fileType: /.(jpg|jpeg|png|webp|gif|svg)$/
                })
            ]
        })) file: Express.Multer.File
    ) {
        await this.productService.getProductById(id)
        const image = await this.cloudinaryService.uploadImage(file);
        return await this.productService.updateProduct(id, { imgUrl: image.secure_url });
    }
}