import mongoose, { Schema } from "mongoose"

export interface IMedNews {
    news: string
}


const newsSchema: Schema = new Schema({
    news: { type: String }
})
export interface IMedNewsModel extends IMedNews, Document { }
export default mongoose.model<IMedNewsModel>('News', newsSchema)