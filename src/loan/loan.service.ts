import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { ClientSession, Model } from 'mongoose';
import { Loan } from './entities/loan.entity';
import { CreateLoanDto } from './dto/create-loan.dto';
import { UpdateLoanDto } from './dto/update-loan.dto';
import {
  createErrorResponse,
  updateErrorResponse,
} from 'src/common/methods/errors';
import { BookService } from 'src/book/book.service';
import { State } from 'src/state/entities/state.entity';
import { StateService } from 'src/state/state.service';

@Injectable()
export class LoanService {
  constructor(
    @InjectModel(Loan.name) private readonly loanModel: Model<Loan>,
    private readonly bookService: BookService,
    private readonly stateService: StateService,
  ) {}

  async create(createLoanDto: CreateLoanDto) {
    const session: ClientSession = await this.loanModel.db.startSession();
    session.startTransaction();

    try {
      const states: State[] = await this.stateService.findAll();

      if (states.length <= 0) throw new NotFoundException('States not found');

      const loanedState = states.find((state) => state.name === 'loaned');
      if (!loanedState) throw new NotFoundException("State 'loaned' not found");

      const availableState = states.find((s) => s.name === 'available');
      if (!availableState)
        throw new NotFoundException("State 'available' not found");

      const updatedBook = await this.bookService.changeBookState(
        createLoanDto.book,
        loanedState,
        session,
      );

      if (!updatedBook)
        throw new BadRequestException(
          'Book must be in "available" state to be loaned',
        );

      const loan = new this.loanModel({
        ...createLoanDto,
        loan_date: new Date(),
      });

      await loan.save({ session });

      await session.commitTransaction();

      return loan;
    } catch (error) {
      await session.abortTransaction();

      createErrorResponse('Loan', error);
    } finally {
      await session.endSession();
    }
  }

  async findAll(): Promise<State[]> {
    return await this.loanModel.find();
  }

  async findOne(id: string) {
    const loan = await this.loanModel.findById(id);

    if (!loan) throw new NotFoundException('Loan not found');

    return loan;
  }

  async update(id: string, updateLoanDto: UpdateLoanDto) {
    const session: ClientSession = await this.loanModel.db.startSession();
    session.startTransaction();

    try {
      const states: State[] = await this.stateService.findAll();

      if (states.length <= 0) throw new NotFoundException('States not found');

      const loanedState = states.find((s) => s.name === 'loaned');
      if (!loanedState) throw new NotFoundException("State 'loaned' not found");
      const availableState = states.find((s) => s.name === 'available');
      if (!availableState)
        throw new NotFoundException("State 'available' not found");

      const book = await this.bookService.findOne(updateLoanDto.book!);
      if (!book) throw new NotFoundException('Book not found');

      let newState: State | null = null;

      if (book.state.equals(availableState._id)) {
        newState = loanedState;
      } else if (book.state.equals(loanedState._id)) {
        newState = availableState;
      } else {
        throw new BadRequestException(
          `Book state must be either 'available' or 'loaned' to update`,
        );
      }

      const updatedBook = await this.bookService.changeBookState(
        updateLoanDto.book!,
        newState,
        session,
      );

      if (!updatedBook) {
        throw new BadRequestException(
          'Book state change failed — it may not be in the expected state',
        );
      }

      const updatedLoan = await this.loanModel.findByIdAndUpdate(
        id,
        {
          return_date: new Date(),
        },
        { new: true, session },
      );

      await session.commitTransaction();

      return updatedLoan;
    } catch (error) {
      await session.abortTransaction();

      updateErrorResponse('Loan', error);
    } finally {
      await session.endSession();
    }
  }

  async remove(id: string) {
    return this.loanModel.findByIdAndDelete(id);
  }
}
