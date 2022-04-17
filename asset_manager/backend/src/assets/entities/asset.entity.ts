import { Entity, Column, PrimaryGeneratedColumn, BeforeInsert, ObjectIdColumn } from 'typeorm';
// import * as crypto from 'crypto';

@Entity('assets')
export class Assets {

    @ObjectIdColumn()
    _id: string;

    @Column()
    serial: string;

    @Column()
    type: string;

    @Column()
    color: string;

    // @BeforeInsert()
    // hashMetaData() {
    //     this.meta = crypto.createHmac('sha256', this.meta).digest('hex');
    // }
    @Column()
    metadata: object;
}